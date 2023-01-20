package mk.profesori.springapp.Model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class PostReport {

    @Id
    @SequenceGenerator(name = "post_report_sequence", sequenceName = "post_report_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_report_sequence")
    private Long postReportId;

    @ManyToOne
    @JoinColumn(name = "custom_user_details_id")
    private CustomUserDetails user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    LocalDateTime time;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "resolved")
    private boolean resolved;

    public PostReport(CustomUserDetails user, Post post, String description) {
        this.user = user;
        this.post = post;
        this.time = LocalDateTime.now();
        this.description = description;
        this.resolved=false;
    }
}